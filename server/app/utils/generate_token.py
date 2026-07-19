from datetime import datetime, timedelta,timezone
from jose import jwt , JWTError, ExpiredSignatureError
from app.config import secret_key, access_token_expire


SECRET_KEY=secret_key
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=access_token_expire


def generate_access_token(data:dict):
    payload = data.copy()
    
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    payload.update({"exp":expire})

    return jwt.encode(payload,SECRET_KEY,algorithm=ALGORITHM)


def decode_access_token(access_token: str):
    try:
        payload = jwt.decode(
            access_token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        return payload

    except ExpiredSignatureError:
        return None

    except JWTError:
        return None