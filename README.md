# WHAT IS IT?
- django db + api (tastypie)
- react components
- finance app for people who cares about privacy and features then just styling and useless crap

# How to start?
## Cold start
Make sure what you installed [uv](https://docs.astral.sh/uv/) and [npm](https://www.npmjs.com/package/npm). If u dont have these packages plz install them on officialy websites.
Commands below install all dependesys for project in venv, enter yes or no, to not install them.
```bash
cd MyFinance
uv venv && uv pip install req.txt
cd frontend
npm install
cd ./../
bash start.sh
```

## Warm start
```bash
cd MyFinance && bash start.sh
```
>[!tip]
>To clear db.sqlite3 pleze
>google and find to specific command to do this
> it probably `python manage.py flush` or `python manage.py reset app` (add uv in beginning if u use uv as package manager)
> link -> [click!](https://stackoverflow.com/questions/6485106/what-is-the-easiest-way-to-clear-a-database-from-the-cli-with-manage-py-in-djang)
