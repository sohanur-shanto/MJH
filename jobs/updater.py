# from apscheduler.schedulers.background import BackgroundScheduler
# from .jobs import my_scheduled_job, my_email, my_payment

def start():
    scheduler = BackgroundScheduler()
    # scheduler.add_job(my_scheduled_job, 'interval', hours=2)
    # scheduler.add_job(my_email, 'interval', minutes=1)
    # scheduler.add_job(my_payment, 'interval', minutes=1)
    scheduler.start()
