import scrapy
from course_scraper.items import Elective
from scrapy_splash import SplashRequest

class ElectiveSpySpider(scrapy.Spider):
    name = "elective_spy"
    start_urls = ["https://www.sis.itu.edu.tr/TR/ogrenci/lisans/ders-planlari/plan/EHBE/202210.html"]

    def start_requests(self):
        for url in self.start_urls:
            yield SplashRequest(url=url, callback=self.parse_main, args={'wait': 2})

    def parse_main(self, response):
        all_periods = response.xpath('//div[@class = "table-responsive"]')

        for i in range(1, len(all_periods) + 1):
            period = response.xpath(f'//div[@class = "table-responsive"][{i}]')
            all_courses = period.xpath('./table/tbody/tr')

            for k in range(2, len(all_courses) + 1):
                code = period.xpath(f'./table/tbody/tr[{k}]/td[1]/a/text()').get()
                if code is None:
                    name = period.xpath(f'./table/tbody/tr[{k}]/td[2]/a/text()').get()
                    link = period.xpath(f'./table/tbody/tr[{k}]/td[2]/a/@href').get()
                    full_link = response.urljoin(link)
                    semester = period.xpath(f'./table/tbody/tr[{k}]/td[10]/text()').get()
                    yield SplashRequest(url=full_link, callback=self.parse_elective, meta={'name': name, 'semester': semester}, args={'wait': 5})
                else:
                    continue

    def parse_elective(self, response):
        name = response.meta['name']
        semester = response.meta['semester']

        elective = Elective()
        elective["name"] = name
        elective["course_list"] = []
        elective["semester"] = semester

        table = response.xpath('//div[@class = "table-responsive"]/table/tbody')

        print(f"Processing elective: {name}, Semester: {semester}")
        
        rows = table.xpath('./tr')
        print(f"Found {len(rows)} rows in the elective table")

        for k in range(2, len(rows) + 1):
            course = {
                "code": table.xpath(f'./tr[{k}]/td[1]/a/text()').get(),
                "name": table.xpath(f'./tr[{k}]/td[2]/text()').get(),
                "credit": table.xpath(f'./tr[{k}]/td[3]/text()').get(),
                "semester": semester
            }
            print(f"Adding course: {course['code']} - {course['name']}")
            elective["course_list"].append(course)

        print(f"Total courses added for {name}: {len(elective['course_list'])}")
        yield elective
