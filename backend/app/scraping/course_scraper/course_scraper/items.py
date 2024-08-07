# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class Course(scrapy.Item):
    name = scrapy.Field()
    code = scrapy.Field()
    prerequisite = scrapy.Field()
    credit = scrapy.Field()
    type = scrapy.Field()
    comp_or_elect = scrapy.Field()
    semester = scrapy.Field()
    
class Elective(scrapy.Item):
    name = scrapy.Field()
    course_list = scrapy.Field()
    semester = scrapy.Field()