##### Personal Finance Manager
* As part of my Angular learning journey, I am working on an API whcih I'll use the angular library to build  the frontend.
* So far, I am closer to the beginning than the end because as they say An application will always need        something to be improved on or maintained. It's like a tool. It needs maintenance often.

###### Issues Faced while Working on this
* Had to change the DB during development from sqlite3 (default django) to Postgres.
* Since I didn't want to start all over with data, I backed up the data using 
    `python manage.py dumpdata <appname> --format json --indent 4 > data.json`
* While done with the setup and was loading the data, I encountered some errors (some permission issues). Turned out it was because I didn't create an admin user for the application.
* Also, to be able to restore data to all tables, you need to ensure the DB user has all priviledges

----------------------------------------------------------------------------------------------
###### Tools I intend to Use for this project
* Angular
- Django of course
- Some graphs (Chart.js, Plotly, or Other) for visualization
- Normal (HTML, CSS)
- Postgres
- Docker (Compose)
