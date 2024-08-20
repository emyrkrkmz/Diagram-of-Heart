import scrapy
from course_scraper.items import Elective
from scrapy_splash import SplashRequest

class ElectiveSpySpider(scrapy.Spider):
    name = "elective_spy"
    start_urls = ["https://www.sis.itu.edu.tr/TR/ogrenci/lisans/ders-planlari/plan/EHBE/202210.html"]

    def start_requests(self):
        for url in self.start_urls:
            yield SplashRequest(url=url, callback=self.parse_main, args={'wait': 2}, dont_filter=True)

    def parse_main(self, response):
        all_periods = response.xpath('//div[@class = "table-responsive"]')

        for i in range(1, len(all_periods) + 1):
            period = response.xpath(f'//div[@class = "table-responsive"][{i}]')
            all_courses = period.xpath('./table/tbody/tr')

            for k in range(2, len(all_courses) + 1):
                code = period.xpath(f'./table/tbody/tr[{k}]/td[1]/a/text()').get()
                
                if code is None:
                    link = period.xpath(f'./table/tbody/tr[{k}]/td[2]/a/@href').get()
                    full_link = response.urljoin(link)
                    semester = period.xpath(f'./table/tbody/tr[{k}]/td[10]/text()').get()
                    
                    self.logger.info(f'Visiting: {full_link}')

                    yield SplashRequest(url=full_link, callback=self.parse_elective, meta={'semester': semester}, args={'wait': 5}, dont_filter=True)


    def parse_elective(self, response):

        elective = Elective()
        elective["semester"] = response.meta['semester']
        elective["course_list"] = []

        table = response.xpath('//div[@class = "table-responsive"]/table/tbody')

  
        rows = table.xpath('./tr')
        
        name = response.xpath('/html/body/div/div/h2/text()[2]').get()
        elective["name"] = name

        for k in range(2, len(rows) + 1):
            
            link = table.xpath(f'./tr[{k}]/td[1]/a/@href').get()
            
            course = {
                "code": table.xpath(f'./tr[{k}]/td[1]/a/text()').get(),
                "name": table.xpath(f'./tr[{k}]/td[2]/text()').get(),
                "credit": table.xpath(f'./tr[{k}]/td[3]/text()').get(),
                "semester": response.meta['semester'],
                "prerequisite": []
            }
            
            
            yield SplashRequest(url=link, callback=self.parse_prereq, meta={'course': course, 'elective': elective}, args={'wait': 5}, dont_filter=True)
            

                                   
            
    def parse_prereq(self, response):
        
        course = response.meta['course']
        elective = response.meta['elective']
        
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
                
                
        elective["course_list"].append(course)
    
        yield elective