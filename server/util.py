import string
from pathlib import Path
from random import choice

import yaml


def load_yaml(file_path: str):
    with Path(file_path).open('r') as file:
        return yaml.load(file)


def rndstr(size=16):
    _basech = string.ascii_letters + string.digits
    return "".join([choice(_basech) for _ in range(size)])


def url_encode(args):
    if not args:
        return ""
    return "?" + "&".join([f"{key}={value}" for (key, value) in args.items()])
