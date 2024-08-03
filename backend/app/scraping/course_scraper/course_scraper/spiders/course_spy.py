import scrapy
from course_scraper.items import Course
from scrapy_splash import SplashRequest


def clean_descrip(text):
    text = text.replace("<br>", " ")
    text = text.replace(" MIN DD ", " ")
    text = text.replace("<td>", "")
    text = text.split("veya")
    return text.join("ve").split("ve")


class CourseSpySpider(scrapy.Spider):
    name = "course_spy"
    start_urls = ["https://www.sis.itu.edu.tr/TR/ogrenci/lisans/ders-planlari/plan/EHBE/202210.html"]

    def start_requests(self):
        for url in self.start_urls:
            yield SplashRequest(url=url, callback=self.parse_main)
        
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
                course["semester"] = period.xpath(f'./table/tbody/tr[{k}]/td[10]/text()').get()
                
                #url = period.xpath(f'./table/tbody/tr[{k}]/td/a/@href').get()
                #
                #course["prerequisite"] = SplashRequest(url=url, callback=self.parse_preq)
                

                yield course
            
    #def parse_preq(self, response):
    #    
    #    descrip = response.xpath('//table/tbody/tr/td/table[3]/tbody/tr[2]/td[2]').get()
    #    
    #    words = descrip.split()
        
        