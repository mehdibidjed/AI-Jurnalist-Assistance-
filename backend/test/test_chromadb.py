from chromadb  import  Client

# Connect to ChromaDB
client = Client()

# Replace "articles" with your collection name
collection = client.get_or_create_collection(name="articles")
print(collection)
# Retrieve all stored items
all_items = collection.get()

# Print summary
print(f"Total items stored: {len(all_items['ids'])}\n")

for i, _id in enumerate(all_items['ids']):
    print(f"ID: {_id}")
    print(f"Vector (first 10 dims): {all_items['embeddings'][i][:10]}")  # print first 10 dims for readability
    print(f"Metadata: {all_items['metadatas'][i]}")
    print("-" * 40)
