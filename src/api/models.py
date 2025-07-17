from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(128), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)

    def set_password(self, password: str) -> None:
        """Genera y guarda el hash de la contraseña."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        """Comprueba si el password corresponde al hash almacenado."""
        return check_password_hash(self.password_hash, password)

    def serialize(self) -> dict:
        """Devuelve un dict con los datos públicos del usuario."""
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active
        }