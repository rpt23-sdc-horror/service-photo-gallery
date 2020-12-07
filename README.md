# Photo Gallery Service
# API Endpoints
RESTful API for Photo Gallery Service.
## Create /photos
Creates a new photo document and stores it into the service's database.

Query Parameters:
- product_id *Integer*
- style_id *String (formatted as 001, 002 ... etc)*
- main_photo *Object*
- other_photos *Array*


## Read /photos/{productid}
Returns all photo data at the provided Product ID

Path Parameters:
- product_id *Inteter*

## Read /photos/{productid}/{styleid}
Returns all photo data at the provided Product ID & Style ID

Path Parameters:
- product_id *Integer*
- style_id *String (formatted as 001, 002 ... etc)*

## Update /photos/{productid}
Updates a record at the provided Product ID & Style ID

Path Parameters:
- product_id *Integer*

Query Parameters:
- style_id *String (formatted as 001, 002 ... etc)*
- updateValue *Object*
*updateValue should contain only 1 key and 1 value to update. Example...*
```
  const example = {
    updateValue: {
      main_photo: {
        thumbnail_url: 'url',
        regular_url: 'url'
      }
    }
  }
```

## Delete /photos/{productid}
Delete all records at the provided Product ID

Path Parameters:
- product_id *Integer*
