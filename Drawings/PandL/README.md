# Pedigree and Lineage Service
The Pedigree And Lineage (P&L) service is a common component that stores a record of an objects cradle to grave ancestry.

The P&L service consists of the following components:

- The P&L service datastore
- The P&L service API
- The P&L service SDK
- The P&L service UI

#Components

## Datastore
A P&L service holds the complete lineage of an object but does not store the actual metadata. The datastore hosted on **TBD**
will hold the following information...

```json5
{
  uuid: "Internal database unique key",
  guide: "guide The objects GUIDE.",
  clonedFromGuide: "Only used when event is OBJECT_CLONED. Links to the old objects GUIDE.",
  eventDateTime: "yyyy-MM-ddTHH:mm:ss The dateTime the event took place.",
  eventType: "A valid eventType from internal list defined in P&L.",
  eventNote: "A short description of what happened in the event. ex: Object added to RMM/Object cloned to system X/Object Deleted",
  eventCN: "The CN of the user/system that should be associated with the event.",
  eventSystemGuide: "The GUIDE of the system where the event took place.",
  locationSystemGuide: "The physical/digital location of the object.",
  cn: "CN grabbed from the API/SDK request.",
  dateTime: "yyyy-MM-ddTHH:mm:ss Datetime the API/SDK sent the request"
}
```

Valid Event Types
```
OBJECT_CREATE - new object created.
OBJECT_DELETE - object deleted/dispositioned.
OBJECT_UPDATE - object was replaced by new version. (eg PDF update)
OBJECT_CLONE - object copied into new system. Object now exists in N+1 systems (eg IDL to IMAP)
OBJECT_METADATA - metadata was associated with the object has been updated/deleted
```

## API
The P&L Service will be kept simple as possible to handle the large quantity of objects and api calls coming from 
various system integrated with it.

### Add Event
```
ngimws/pl/events
RequestType = POST
RequestBody = P&L POJO
```
* Create new P&L entry for an object.
* Performs the following steps:
    * Validate requesters CN
        * Make sure they are an authorized system/user
* **??Checks GUIDE for existence of object??**
* Validates eventType
    * **OBJECT_CREATE**
        * Verify no OBJECT_CREATE exists in P&L already
    * **OBJECT_DELETE**
        * Verify OBJECT_CREATE exists and verify OBJECT_DELETE not exists
    * **OBJECT_UPDATE**
        * Verify OBJECT_CREATE exists and verify OBJECT_DELETE no exists
    * **OBJECT_CLONE**
      * Verify the clonedFromGuide exists in P&L. This puts the work on the calling system/SDK to first create a OBJECT_CREATE event in the system prior to OBJECT_CLONE event.
    * **METADATA_UPDATE**
        * Any metadata associated with the object is created/update/deleted. eventNote would be used to say what happened, but no actual metadata stored in P&L.
* Verify POJO fields
* Add row to datastore
* Return code

### Get Single Event
```
ngimws/pl/event/{uuid}
RequestType = GET
PathParamter = {uuid}
```
* Get specific event from database

### Get All Events For GUIDE
```
ngimws/pl/events
RequestType = GET
RequestParms = {guide}
```
* Get all events for a specific object by GUIDE.

### Get Events For GUIDE By System(s)
```
ngimws/pl/events
RequestType = GET
RequestParms = {guide} {systemGuide(s)}
```
* Get all events in 1-N systems for a specific object by GUIDE.

### Register System
```
ngimws/pl/systems
RequestType = POST
RequestParms = {systemGuide} {systemName} {systemCertificate(s)}
```
* Allows systems to register on the fly with the P&L service
* Systems must register before they can be reference in the **eventSystemGuide**

### Approve System
```
ngimws/pl/systems/approve
RequestType = POST
RequestParms = {systemGuide} {comment}
```
* Approves system integration with P&L

### Reject System
```
ngimws/pl/systems/reject
RequestType = POST
RequestParms = {systemGuide} {comment}
```
* Rejects system integration with P&L

### Get Systems
```
ngimws/pl/systems
RequestType = GET
```
* Return systems and their current operation status with P&L

### Get System
```
ngimws/pl/systems
RequestType = GET
RequestParms = {systemGuide}
```
* Return single systems and their current operation status with P&L

## SDK
TODO some SDK information.

## UI
Source draw.io here: [Draw.io Source](https://app.diagrams.net/#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FPandL%2FP%26L.drawio)

Source draw.io here: [Draw.io export](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=P%26L.drawio#R%3Cmxfile%3E%3Cdiagram%20id%3D%22zN0O8GpO3P3C1JhYR0OU%22%20name%3D%22Info%22%3EtZRRj5swDIB%2FDY%2BdIOzQ9njXXtuHnlStk6bbW0pckl2IWQgH3a%2BfU0KB60nTpO2J%2BLOxHcd2lC7LbmN5JZ9QgI5YLLooXUWMsThj9PHk3JMkYYEUVonARnBQvyDAONBGCahnhg5RO1XNYY7GQO5mjFuL7dzshHoeteIF3IBDzvUt%2FaaEkz39dBePfAuqkEPkJA6akg%2FGAdSSC2wnKH2M0qVFdP2p7JagffWGumyS5x%2Fp82eb790%2Bqb5vmTZ80Ttb%2F80v1ytYMO7fuk57169cN6FeEcs0BXmQFDUr%2FGkgJ6ToVAZ3DrXNfjY4KBb15eXvyYAy7Ubl4GWj3LY5knqnzMvFMONlRQpzrKtJFE4m0sJpFkE659vl3t%2BOrQvlZHP8kGNJwpenw46ahJqMBFvWmp6IrZ0FL5e8dmDpsLK8Vaao6bjnRuxu8%2FsfIXQfYM0npXz30mTTV3deccLTZ2Cz6jMHXZ94qQkkdKydxRdYokZLxKAB%2FzpK6zeornhOqRK4G6WvSBmtFtTa6UMrlYMDcR%2Bqpc1ADF%2FBnvRlAKQSAgwxi40R4BssvmZIZpTZm%2BH7Q%2Bcm13GiRQRYgrNn%2Bq%2Bbr5Kwgj4GsZ2McxqYnIzyYMfDBimujscp8Q%2FYD8ogjvN80U3WYvr4Gw%3D%3D%3C%2Fdiagram%3E%3Cdiagram%20id%3D%22gw-nH7AqX0yCH5nJFknN%22%20name%3D%22P%26amp%3BL%20Object%20Graph%20v1%22%3E7Vxbe6I4GP41XurDGby0HmZ2t9OZ3Xannb3ZByFqpkBYiK3Or98kBAQSFVvQzkGrQgghfIc37%2FcltKePw827xI1XH5APgp6m%2BJuePulpmqZYGvmhJdusRFU1XrJMoM%2FLdgW38BvghQovXUMfpJWKGKEAw7ha6KEoAh6ulLlJgp6r1RYoqF41dpdAKLj13EAsvYc%2BXuW3oSi7A%2B8BXK74pR2THwjdvDIvSFeuj55LRfq0p48ThHC2FW7GIKDSy%2BWSnTfbc7ToWAIi3OQEe73eenjsP9xvbhfYXk0ftjd9I2vlyQ3W%2FIZ5Z%2FE2l0CC1pEPaCNKT796XkEMbmPXo0efidJJ2QqHAdlTyeYCBsEYBShh5%2BozZzacjUg5vwxIMNjs7b9aSIXYE0AhwMmWVOGm4%2FAznndqcFTe%2F1VJA8aQa59rflm0tBMO2eDyOUFWasuySnGCHkFJWgp7nV2KO2Mui9G2WpAjUNef1zD87Ch%2Fohv07u%2BHq6%2BzvtatzfkucBaeTL6W54D5ojiS%2B7NaSFYQo0TYomSrqiiAThEErQ2VoShozVA6ErTo3ON1wu5QUz7OvzK4HOUYyzZn5E%2FVdKNffAmqIdLAR%2Bx47piGKbHjheMBj2rGDeAyImUBWNC2qIwhgdwRLw6h79PLSRVfNY3X6O1Uj9C6AhazW4egr9msHfjQRKuWC8tSOxKWJRGWFVAzWiBm2TupWf%2BtUX6gnzJqQc1dNeLN7iDZWtLf2XQ6uRqN%2F8hbI53LGswOH9CIevqwOHMyoBdcpzhCr10pp69X6pCfMLSVClRp9sAUtapJlNoGUkmVah%2F3AEKfYroJQ8bYytKt4wdGcan02p2D4BNKIYaIHp0jjFFIKgT0wJXrPS6ZLstAxV6kCrvYKI0zZkn14uY7C7ih2r%2Fi%2FZmsMKaUlIOo50f6ABJSuoDESpKBR66ozXwXu%2BSHlqfkN0UedIN%2BCHzo9onEiRZmtkO%2BSL8Cgr7OII6Wh61kj111aT1azXocifXotmg8eVnrxuMcN55jTIzbVrhZ0jBmMHdT6A2Qh90lirTSgOURIYHk0JDFQh9VyxrN%2BD5z9EeAvRXfodrhkY4m0Zaj0PeLUKMF%2Fao19VoS9ZqWBBu0jtQ7FNT7iTjMMgGgR03RckOqzeyblFzDCFCPPJW3RCgCNZnzoubKP85XXmwUhQuzevy29nGdU%2FRtWxV9GxLaKouytK6Ggtz%2BDrmzBPv3orygvQawLx9QqlGD4OK%2Bm67Keq4gCkSpzcaDdLBOWTdepvw6IrSH67ZTdXzdlOG6hBTonVmCGHD%2FjlYRKZmg79q%2F1WG3Q3SRFil8WqLK4Tmd2pARPI7cjG2PAzdN4YJInfmvprwHCSiqHGPgTZItjRQjHeslTqfrr9TU8WCzq6SA6FTgifR24mJwB0MeItF3X1HJ3x3lFaP8i8dG8yQPi9i5d9uYn%2Ffx6vfp%2BO7f8V%2FT0d10T%2B0bhPPaWQ5CU9ZxgFyqSprcJV%2FTz%2FTwM0oeU6ZQErNpumHuaXB8kzX3CMMQBC4D2HQQB%2BzM%2BhkeUe0IkhpP0ANFrT2xRpwgUik9bl3zYjj5uMYBjECvtbSSVnFl1RLHZ92W2M%2BwK%2FvRBfu53aYYhJkOpk%2BuKHNeQVPe%2Ff3bZMqDcFXt808DKK8nkkz6bjWRJCYL2UuaLKxBd%2FZqJxklTRuaZx11NVmG5W3kZ18X2NToTdP8rOp0J%2BoGeY%2FvX9Sm%2FhZELWYJyrj12%2BS6GW6Rrvf55wfDrVdpvDpKSZ3rzCgmpg3K%2Bv7rw4dm%2BiYS6vPPL32f5OHn1bcupg0a8Fr1NF77YXo3mozuRkeZ7X2JupIbdLPEr%2BIGJKKgNPd747H7p6o7GT8Mo5qLkLLeYUesd499NZj9B5E%2FoktOaPDI4lmvKl2wgfihtP2F%2BvTA5HuTDXdxtrPNdyLS%2FYfyTuksurs7je3l52WdA76wukUgpylaJ15%2BBwciRuwmS4CP%2B%2BDBYFcGCnlZQowew6dqh2Wa5Ff4hCCb8NuTwDLMmjFkN8rP2tmD0JCj1xpSag1lkhAaYoZV3PZrbE17EZaZp8Xo1x9vTgjRGcDQAJ3cNMoJk3L9zxEsExDqp8Ix29DzzFvOjIaXRzIxgn8xku3Q60vpyDEkGxj2sIpmiqoewTO29wkkxPxZVu4VIHeYQDSAOe2SMGfVJuh09YUwZ1nVhjTr3DDX9uLDc3l3vnCo8WKYDmmvuHaoyVAxPGmomEyvp43TuWyQiNfEdOjGIqELH7KE7q%2BBYn84VScvb4HxNsgDdsF4LwTq5iVBvVg1noN6HTGagvpQqYF6PaPWOag3SGnum5arzKA3n5Wtz7Vny%2F617Jc2yyxrQHMkbHWOQZuP0G4G8NzOrtSWUDmS9En%2B4EQlPdqdrzdYQ%2FUWtLYIYPyed%2BKiGjyqP9mcXBv6%2B3I9njgw%2BXyvp0qU3AeTaXgvm5PzEhQEaTGDHs1Tvj5qhRL4DUXYDYJt1hdNiQDwZWmpfxAbvWFEeoXWmN0huUFNCdE6pbmt5xWgD%2FzULKXNJeJtLMpoQ%2BNqbYC2bckALVsz2wb3kypdZM9NmJ%2FTjPnlmc5%2FR5PJCUmCjHZlE%2FkrooQlNZYYxoBSqwHZHj25MHDnAeBmJZ94qTJDPzjICatVfhRCWLc3WeLAkC3HaoMQSu3tQnTwvAnQwwm5Mo3c75OXIpG7CD5PXNbJX1MWuUsqbGuW1j6NlMpRJJHtR7WNJ3MKeFsS3VDMolM5PkzjfLUp2SMd%2BxXgnhLgmrZkdWlXAa7UxkTKK7Ux%2BzUL4U7KnFSt6ug04U85Lu4C2ksk1KV2JC40%2BAHHxUMM9Oio6FxyVFTtWm7FsF84KhJKVmupvki341FR8mhEE8hSOx4W2VNuSchY%2F0kA9lOPiLT9NzYiSh64%2BFmgzG4IZepFlzgImSer%2FkRuY4ZfjxXMulV1jWWnzULzR3WKXKPaO7juLs8i7c87fV2HMX%2Fqw2KG5Zf2qg5vnGBqbyb2c%2BqLVppbRu3x8Namhcnu7r%2FdZNV3%2FzRIn%2F4P%3C%2Fdiagram%3E%3Cdiagram%20id%3D%220S-s5jfW5r994tFWpWN-%22%20name%3D%22P%26amp%3BL%20Object%20Graph%20v2%22%3EnZNRb4IwEMc%2FDY8mBaJzj6JMfFhMhnFzbw09obG0pFSBffods4Dow7I90fvd9a73v8Pxl3m91rTIXhUD4XiE1Y6%2FcjzPIzMPPy1prsR1PUtSzZllA4j5F1hILD1zBuUo0CglDC%2FGMFFSQmJGjGqtqnHYUYlx1YKm8ADihIpH%2Bs6Zybo2CBkcEfA0s6XnU%2BvIaRdsQZlRpqob5IeOv9RKmespr5cgWvU6XWC%2B20bu20yQ%2FWcUFvq53Kwm12Qvf7nSt6BBmn%2BnrvX6cJpFH%2FQp3E0nmaSHY2OvkAsVZ6vXbrvaOv4CYbzJC1TRI3vQJVfSqmCaTloDNT4nyEwuELh4LI1WJ1gqoTQSqSRGBkcuxB2igqcSzQQbAuTBBbThOLSFdeScsbZMUGXcQFzQpK1Z4Y4i0%2BosGbRtEbRsB5gA6ruR%2F6KX2w8R1x9UDkY3eK%2FL4ltxmju7Gtao343sZoO6OGo3N%2B1TD9PBgx1QZw579OO7%2BR398Bs%3D%3C%2Fdiagram%3E%3C%2Fmxfile%3E)
