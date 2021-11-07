import oss2

from api.settings import OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET, OSS_BUCKET_NAME, OSS_BUCKET_ENDPOINT


def singleton(class_):
    instances = {}

    def get_instance(*args, **kwargs):
        if class_ not in instances:
            instances[class_] = class_(*args, **kwargs)
        return instances[class_]

    return get_instance


@singleton
class OssAuth(oss2.Auth):
    pass


@singleton
class OssBucket(oss2.Bucket):
    pass


def get_auth(access_key_id=None, access_key_secret=None):
    return OssAuth(
        access_key_id=access_key_id or OSS_ACCESS_KEY_ID,
        access_key_secret=access_key_secret or OSS_ACCESS_KEY_SECRET
    )


def get_bucket(oss_auth=None,
               endpoint=None,
               bucket_name=None):

    if not oss_auth:
        oss_auth = get_auth()

    return OssBucket(
        oss_auth,
        endpoint=endpoint or OSS_BUCKET_ENDPOINT,
        bucket_name=bucket_name or OSS_BUCKET_NAME,
    )


def list_files():
    files = [{'key': obj.key, 'last_modified': obj.last_modified} for obj in oss2.ObjectIterator(get_bucket())]
    files.sort(key=lambda x: x.get('last_modified'), reverse=True)
    return [file.get('key') for file in files]


def sign_file(key):
    object_name = '%s' % key
    bucket = get_bucket()
    url = bucket.sign_url('GET', object_name, 60)
    return url


def upload_to_oss(filename, file):
    bucket = get_bucket()
    bucket.put_object(filename, file)
    return True


