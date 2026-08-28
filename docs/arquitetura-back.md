# Arquitetura Back-End

```text
backend/
└──app/
   ├── main.py
   ├── database.py
   ├── models/
   │   ├── user.py
   │   ├── submission.py
   │   ├── answer.py
   │   └── question.py
   │
   ├── schemas/
   │   ├── auth.py
   │   ├── user.py
   │   └── form.py
   │
   ├── routers/
   │   ├── auth.py
   │   ├── users.py
   │   └── forms.py
   │
   └── services/
       ├── auth.py
       ├── users.py
       └── forms.py
```
