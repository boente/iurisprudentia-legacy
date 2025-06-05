# Starting the server

```sh
PORT=4321 node ./src/server.js
```

# Example Request

```sh
curl -d "{\"term\":\"josef\"}" -H "Content-Type: application/json" -X POST localhost:4321/search
```
# Deploy

```sh
git pull origin your-branch-name
```
```sh
sudo supervisorctl restart search-apis:
```

# Read&Search API 

This is a description of the Read&Search API. With example responses.

BASE_URL = https://transkribus.eu/r/search-read

Offset and Limit params can be set to determine how many results should be retrieved

E.g. set offset 0 and limit 500 to retrieve the first 500 results

## Fetch list of documents for collection

### Request

`POST /documents`

    curl 'https://transkribus.eu/r/search-read/documents' -H 'Accept: application/json; charset=utf-8' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://transkribus.eu/r/demo-read-search/' -H 'Content-Type: application/json; charset=utf-8' -H 'DNT: 1' -H 'Connection: keep-alive' --data-raw '{"collections":[26748],"offset":0,"limit":1024}'

### Response
```
 {"total":0,"params":{"limit":1024},"items":[{"id":114485,"title":"Cod. Pal. germ. 848 Große Heidelberger Liederhandschrift (Codex Manesse)"},{"id":118032,"title":"HS113 (1791)"},{"id":118033,"title":"HS114 (1792)"},{"id":4382,"title":"HS_118 (1794)"},{"id":4383,"title":"HS_119 (1794)"},{"id":4384,"title":"HS_120 (1795)"},{"id":4386,"title":"HS_121 (1794/96)"},{"id":4388,"title":"HS_122 (1797)"}]}
```
## Fetch document

### Request

`GET /documents/${id}`

    curl 'https://transkribus.eu/r/search-read/documents/118032' -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0' -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://transkribus.eu/r/demo-read-search/' -H 'DNT: 1' -H 'Connection: keep-alive'

### Response example for PATH = Ahvenanmaan tuomiokunnan renovoidut tuomiokirjat

    {"id":118032,"title":"HS113 (1791)","pageCount":459}

## Fetch document pages

### Request

`POST /documents/${id}/pages/`

    curl 'https://transkribus.eu/r/search-read/documents/118032/pages/' -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0' -H 'Accept: application/json; charset=utf-8' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://transkribus.eu/r/demo-read-search/' -H 'Content-Type: application/json; charset=utf-8' -H 'Origin: https://transkribus.eu' -H 'DNT: 1' -H 'Connection: keep-alive' --data-raw '{"offset":0,"limit":18}'

### Response
```
{"total":459,"params":{"limit":18},"items":[{"id":"118032","title":"HS113 (1791)","number":1,"previewImage":"https://files.transkribus.eu/iiif/2/BCIGQMEREXMYNVJKGRNCEUGF/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":2,"previewImage":"https://files.transkribus.eu/iiif/2/ODIDFGPCBIUKSVRCPDYHRRXU/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":3,"previewImage":"https://files.transkribus.eu/iiif/2/EBMEPJYNUTALBVWIVBUJPHCG/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":4,"previewImage":"https://files.transkribus.eu/iiif/2/BFGIIOOBHFVEVNVLVXXDQWMU/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":5,"previewImage":"https://files.transkribus.eu/iiif/2/HRGKUXQCTFJZSFMKJJXKIMUE/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":6,"previewImage":"https://files.transkribus.eu/iiif/2/QWFFOOYPVBCELDRNFCGJDMJU/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":7,"previewImage":"https://files.transkribus.eu/iiif/2/PROVMBVLZCKJYFURKKXPUKNF/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":8,"previewImage":"https://files.transkribus.eu/iiif/2/QHDIUFEKCERZPWYSVJREXLOS/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":9,"previewImage":"https://files.transkribus.eu/iiif/2/LOEAEPWCWMEELNIAEKNZEESZ/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":10,"previewImage":"https://files.transkribus.eu/iiif/2/JMYPOGRWWIGIQCVVSTNXJRBF/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":11,"previewImage":"https://files.transkribus.eu/iiif/2/FGGKXNXPTNBLERWYUQAARCHS/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":12,"previewImage":"https://files.transkribus.eu/iiif/2/OVBTGNVENUDIXIGCVRSAQLCO/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":13,"previewImage":"https://files.transkribus.eu/iiif/2/KQKJHGEYCYRCJEDAWUZAGDVL/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":14,"previewImage":"https://files.transkribus.eu/iiif/2/ZDGHJVWMUKNRLUQNMLNZQMOC/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":15,"previewImage":"https://files.transkribus.eu/iiif/2/NNYHWKIIFUKYJJOGANOXAYQC/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":16,"previewImage":"https://files.transkribus.eu/iiif/2/SMYKSZMPKEUIDCXAHLEQIWDO/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":17,"previewImage":"https://files.transkribus.eu/iiif/2/USIXRTOTMGYQUEZBVJETJKMB/full/128,/0/default.jpg"},{"id":"118032","title":"HS113 (1791)","number":18,"previewImage":"https://files.transkribus.eu/iiif/2/VEZHKJJOHMBFALWOHRICOTKT/full/128,/0/default.jpg"}]}
```


## Fetch document pages by number

### Request

`POST /documents/${id}/pages/${pageNum}`
```
 curl 'https://transkribus.eu/r/search-read/documents/4382/pages/155'-H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://transkribus.eu/r/demo-read-search/' -H 'DNT: 1' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache'
```
### Response
```
{"image":"https://files.transkribus.eu/iiif/2/UEPBUSORWGHQOMCNHDOPHFWO/info.json","content":"https://files.transkribus.eu/Get?id=QGZDKDMXLYUXHFXNDEUEMINJ"}
```

## Fetch images in different sizes

IMAGE_ID => https://files.transkribus.eu/iiif/2/IMAGE_ID/info.json

### Request 

* small : `GET https://files.transkribus.eu/iiif/2/IMAGE_ID/full/480,/0/default.jpg`
* medium: `GET https://files.transkribus.eu/iiif/2/IMAGE_ID/full/720,/0/default.jpg`
* large: `GET https://files.transkribus.eu/iiif/2/IMAGE_ID/full/960,/0/default.jpg`
* extra-large : `GET https://files.transkribus.eu/iiif/2/IMAGE_ID/full/full/0/default.jpg`
```
curl 'https://files.transkribus.eu/iiif/2/VZJHVIRKGSUBZOOQCJCEFIJQ/full/480,/0/default.jpg' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive'
```
### Response

    Image


## Fetch search results

### Request

`POST /search`

    curl 'https://transkribus.eu/r/search-read/search' -H 'Accept: application/json; charset=utf-8' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://transkribus.eu/r/demo-read-search/' -H 'Content-Type: application/json; charset=utf-8' -H 'Origin: https://transkribus.eu' -H 'DNT: 1' -H 'Connection: keep-alive' --data-raw '{"term":"Magistrat","collections":[26748],"fuzziness":1,"offset":0,"limit":10}'

### Response

    {"total":498,"params":{"term":"Magistrat","limit":10,"offset":0},"results":[{"id":"4383","title":"HS_119 (1794)","page":128,"snippets":[[{"string":" Bittschrift 18 Zentner karntnerische Schaaf= wolle einführen zu dürfen an= gesucht, vermög des "},{"isMatch":true,"string":"magistrat"}],[{"string":" wird, der "},{"isMatch":true,"string":"Magistrat"},{"string":" die Aüßerung zu erstatten habe, ob dem Bittsteller die angesuchten 18 Zentner, oder"}],[{"string":" berichten: werden sollen. daß der "},{"isMatch":true,"string":"Magistrat"},{"string":" auf die gänz= liche Bewilligung des Reinstalleri= schen Gesuches"}],[{"string":" 920. Kreißämt. Reskript d. d. 14ten praes. 16ten Aug., daß die von dem "},{"isMatch":true,"string":"Magistrat"},{"string":" getroffene Vor"}]],"image":{"id":"MROBQZNAIXUPIBIPDMTSIHIZ","width":5409,"height":4594,"imageInfo":"https://files.transkribus.eu/iiif/2/MROBQZNAIXUPIBIPDMTSIHIZ/info.json"},"coords":[{"id":"r1l13_4","label":"magistrat","rect":{"x":1326,"y":1537,"width":411,"height":102}},{"id":"r1l17_4","label":"Magistrat","rect":{"x":1131,"y":2026,"width":362,"height":100}},{"id":"r1l26_3","label":"Magistrat","rect":{"x":1998,"y":2898,"width":348,"height":96}},{"id":"r1l35_2","label":"Magistrat","rect":{"x":711,"y":3904,"width":360,"height":100}}]},{"id":"4384","title":"HS_120 (1795)","page":301,"snippets":[[{"string":"150. in keinem Falle zugelassen werden könne, sondern es habe der noch bestehende "},{"isMatch":true,"string":"Magistrat"},{"string":" sein"}],[{"string":". Spielmann. Ist der Meynung, daß sich werde. der gegenwärtige "},{"isMatch":true,"string":"Magistrat"},{"string":" in diesen Brükenbau nicht mischen"}],[{"string":", und von dem künftigen "},{"isMatch":true,"string":"Magistrat"},{"string":" neüerlich gewählet worden... 


## Fetch tag results

### Request 

`POST /tags`

    curl 'https://transkribus.eu/r/search-read/tags' -H 'Accept: application/json; charset=utf-8' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://transkribus.eu/r/demo-read-search/' -H 'Content-Type: application/json; charset=utf-8' -H 'Origin: https://transkribus.eu' -H 'DNT: 1' -H 'Connection: keep-alive' --data-raw '{"value":"Magistrat","type":["abbrev"],"facets":["cA_year","cA_country","cA_lastname","type"],"facetValues":[],"collections":[26748],"offset":0,"limit":10}'

### Response

    {"total":1,"params":{"value":"Magistrat","limit":10,"offset":0},"results":[{"id":7964901,"dId":4382,"pageId":114440,"pageNr":155,"colId":[26748],"regId":"r2l33","tsId":6001305,"offset":9,"length":10,"value":"magistrat.","context_before":" Ambach in Folge ","context_after":" Dekrets vom 3ten ","type":"abbrev","_version_":1682910687112724500}],"facets":{"cA_year":[],"cA_country":[],"cA_lastname":[],"type":[{"value":"abbrev","count":1}]}}

## Get Page-Content as XML

Get CONTENT_ID from response of `POST /documents/${id}/pages/${pageNum}`

### Request

`GET https://files.transkribus.eu/Get?id=CONTENT_ID`

    curl 'https://files.transkribus.eu/Get?id=QGZDKDMXLYUXHFXNDEUEMINJ'

### Response
```
  `<?xml version="1.0" encoding="UTF-8"?>
<PcGts xmlns="http://schema.primaresearch.org/PAGE/gts/pagecontent/2013-07-15"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://schema.primaresearch.org/PAGE/gts/pagecontent/2013-07-15 http://schema.primaresearch.org/PAGE/gts/pagecontent/2013-07-15/pagecontent.xsd">
    <Metadata>
     .....
```
