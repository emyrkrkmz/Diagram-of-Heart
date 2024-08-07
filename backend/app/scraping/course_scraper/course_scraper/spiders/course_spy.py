import scrapy
from course_scraper.items import Course
from scrapy_splash import SplashRequest


class CourseSpySpider(scrapy.Spider):
    name = "course_spy"
    start_urls = ["https://www.sis.itu.edu.tr/TR/ogrenci/lisans/ders-planlari/plan/EHBE/202210.html"]

    def start_requests(self):
        for url in self.start_urls:
            yield SplashRequest(url=url, callback=self.parse_main, args={'wait': 2})
        
    def parse_main(self, response):
        all_ = response.xpath('//div[@class = "table-responsive"]')
        
        for i in range(1, len(all_) + 1):
            period = response.xpath(f'//div[@class = "table-responsive"][{i}]')
            all_courses = period.xpath('./table/tbody/tr')
            
            for k in range(2, len(all_courses) + 1):
                
                course = Course()
                course["code"] = period.xpath(f'./table/tbody/tr[{k}]/td[1]/a/text()').get()
                if course["code"] is None:
                    course["code"] = "ELECTIVE"
                
                course["name"] = period.xpath(f'./table/tbody/tr[{k}]/td[2]/text()').get()
                
                if course["name"] is None:
                    course["name"] = period.xpath(f'./table/tbody/tr[{k}]/td[2]/a/text()').get()
                    
                course["credit"] = period.xpath(f'./table/tbody/tr[{k}]/td[3]/text()').get()
                course["type"] = period.xpath(f'./table/tbody/tr[{k}]/td[8]/text()').get()
                course["comp_or_elect"] = period.xpath(f'./table/tbody/tr[{k}]/td[9]/text()').get()
                course["semester"] = int(period.xpath(f'./table/tbody/tr[{k}]/td[10]/text()').get())
                
                if course["name"] == "ELECTIVE":
                    course["prerequisite"] = []
                    
                    yield course
                
                else:
                    url = period.xpath(f'./table/tbody/tr[{k}]/td/a/@href').get()
                    full_url = response.urljoin(url)
                    
                    yield SplashRequest(url=full_url, callback=self.parse_preq, meta={'course': course}, args={'wait': 5})
                
           
    def parse_preq(self, response):
        
        course = response.meta['course']
        course["prerequisite"] = []

        
        all_preq = response.xpath('//table/tbody/tr/td/table[3]/tbody/tr[2]/td[2]')
        
        for k in range(1,len(all_preq.xpath('./text()')) + 1):
            preq = all_preq.xpath(f'./text()[{k}]').get()
            
            preq = preq.replace('ve ', '')
            preq = preq.replace('veya ', '')
            preq = preq.replace('Yok', '')
            
            if preq == '':
                continue
            preq = preq.replace(' MIN DD', '')
            preq = preq.replace(' MIN BB', '')
            course["prerequisite"].append(preq)
        
        
        
        if len(all_preq.xpath('./font')) != 0:
            for k in range(1, len(all_preq.xpath('./font')) + 1):
                c_of_lec = len(all_preq.xpath(f'./font[{k}]/text()'))
                for lec in range(1, c_of_lec + 1):
                    preq = all_preq.xpath(f'./font[{k}]/text()[{lec}]').get()

                    if lec == 1:
                        preq = preq.replace('(', '')
                    elif lec == c_of_lec:
                        preq = preq.replace('veya ', '')
                        preq = preq.replace(')', '')
                    else:
                        preq = preq.replace('veya ', '')
                
                preq = preq.replace(' MIN DD', '')
                preq = preq.replace(' MIN BB', '')
                
                preq = preq.replace('Yok', '')
                
                course["prerequisite"].append(preq)
            
        yield course
        
        
        