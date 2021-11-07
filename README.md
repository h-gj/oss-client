### A Simple AliYun OSS Client for Saving Your File Stuffs.

### Tech Stack
Frontend: React

Backend: Flask

### Home Page
[![IQH51H.jpg](https://z3.ax1x.com/2021/11/06/IQH51H.jpg)](https://imgtu.com/i/IQH51H)


### File List Page
[![IQb724.jpg](https://z3.ax1x.com/2021/11/06/IQb724.jpg)](https://imgtu.com/i/IQb724)

### Setup

#### Setup Backend

```shell
git pull
cd api/
pip install -r req.txt
export FLASK_APP=index.py [On Mac/Linux] OR set FLASK_APP=index.py [On Windows]
```


Create config file:

Under `api/` directory, create a new file named ``settings.py``

Past the following two lines into it:

```Python
OSS_ACCESS_KEY_ID = 'xxx'
OSS_ACCESS_KEY_SECRET = 'xxx'
```

Replace the 'xxx' with your real value.

```shell
[python -m] flask run
```

#### Setup Frontend

```shell
cd ui/
npm i
vim src/config.js  // edit `baseUrl` to point to your local backend server, ie: 'http://localhost:5000'.
npm start
```
