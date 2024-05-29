#!/bin/sh
for i in 1 10;
do curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2ODY5Mjc4LCJpYXQiOjE3MTY4Njg2NzgsImp0aSI6ImJhNGU3NzQ0NjgzZTQ2NGU4YmRiNDllOGIyMDkyOWZhIiwidXNlcl9pZCI6MX0.YZXJSZJ0oTtttlmu-91w8NHAxlt2OYnUjOmhgQu8dNA" http://127.0.0.1:8000/apiv1/bud/;
done;
