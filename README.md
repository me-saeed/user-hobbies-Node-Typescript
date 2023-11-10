

## APIs

### 1. Create a User

- **Endpoint**: `/api/users/createUser`
- **Method**: `POST`
- **Description**: Create a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe"
  }
  
- **Request Response**:
  ```json
  {
  "_id": {
    "$oid": "654de2d206deb872c6387399"
  },
  "name": "MockUser",
  "hobbies": [],
  "__v": 1
}

### 2. Get All Users

- **Endpoint**: `/api/users/getUsers`
- **Method**: `GET`
- **Description**: Get all users.

- **Request Response**:
  ```json
  {[
  {
    "_id": "user_id_1",
    "name": "John Doe",
    "hobbies": ["hobby_id_1", "hobby_id_2"]
  },
  {
    "_id": "user_id_2",
    "name": "Jane Smith",
    "hobbies": ["hobby_id_3"]
  }]
  }
### 3. Create user Hobby

- **Endpoint**: `/api/users/createHobby`
- **Method**: `POST`
- **Description**: Create hoppy.
- - **Request body**:
  ```json
  
  {
  "userId": "user_id",
  "passionLevel": "High",
  "name": "Programming",
  "year": "2022" 
   }

- **Request Response**:
  ```json
  
  {
  "_id": "hobby_id",
  "passionLevel": "High",
  "name": "Programming",
  "year": "2022"}

 4. Get user  with hobbies

- **Endpoint**: `/api/users/getUserWithHobbies/:userId`
- **Method**: `GET`
- **Description**: Get  user with their associated hobbies.

- **Request Response**:
  ```json
  {
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "hobbies": [
      {
        "_id": "hobby_id_1",
        "passionLevel": "High",
        "name": "Programming",
        "year": "2022"
      },
      {
        "_id": "hobby_id_2",
        "passionLevel": "Medium",
        "name": "Gaming",
        "year": "2022"
      }
    ]
  }
  }
5. Delete Hobby

- **Endpoint**: `/api/users/deleteHobby/:userId/:hobbyId`
- **Method**: `DELETE`
- **Description**: Delete a hobby associated with a user.

- **Request Response**:
  ```json
   {
  "message": "Hobby deleted successfully"
   }
# user-hobbies-Node-Typescript
Run the following command to install project dependencies:

```bash
npm install
```
To run on Project:

```bash
npm start
```
To  run Test :

```bash
npm test
```

####  modify .evn file (or make it)
add these in Env File:

PORT=3001

MONGO_URI="mongodb://localhost:27017/userHobbies"






  





