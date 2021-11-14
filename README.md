### A Simple AliYun OSS Client For Saving Your File Stuffs.

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
pip install -r api/req.txt
export FLASK_APP=api/index.py [On Mac/Linux] OR set FLASK_APP=api/index.py [On Windows]
```


Create config file:

Under `api/` directory, create a new file named ``settings.py``

Past the following two lines into it:

```Python
OSS_ACCESS_KEY_ID = 'xxx'
OSS_ACCESS_KEY_SECRET = 'xxx'
OSS_BUCKET_NAME = 'xxx'
OSS_BUCKET_ENDPOINT = 'xxx'  #  ie: 'https://oss-cn-hongkong.aliyuncs.com'
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



### Done

- [x] Support uploading on pasting.
- [x] Support multiple files uploading in one time.


### Todo
