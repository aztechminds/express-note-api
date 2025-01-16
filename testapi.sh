curl http://localhost:8080/notes
curl http://localhost:8080/notes/1
curl -X DELETE http://localhost:8080/notes/1

curl -X POST http://localhost:8080/notes \
     -H "Content-Type: application/json" \
     -d '{
          "note": "My new Note",
          "autor": "Max Mustermann",
          "date": "2025-01-15"
        }'

curl -X PUT http://localhost:8080/notes/1 \
     -H "Content-Type: application/json" \
     -d '{
          "note": "Updated Note",
          "autor": "Max Mustermann",
          "date": "2025-01-16"
        }'



