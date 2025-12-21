import os
import yaml

# Configuration based on cms.yaml structure
# We scan 'content' because the CMS config uses content/blog, content/pages, etc.
content_dir = "content"
output_file = ".pages.yaml"

# Define the collections we want to include based on the Canvas configuration
collections = ["blog", "pages", "settings"]

# Initialize the structure for .pages.yaml content
pages_structure = []

def generate_structure():
    if not os.path.exists(content_dir):
        print(f"Error: Directory '{content_dir}' not found.")
        return

    for item in collections:
        item_path = os.path.join(content_dir, item)
        
        if os.path.exists(item_path):
            # For settings, we might want to list individual files as they are singletons
            if item == "settings":
                for file in os.listdir(item_path):
                    if file.endswith((".yaml", ".yaml")):
                        name = file.split(".")[0].replace("_", " ").capitalize()
                        pages_structure.append({
                            "name": f"Admin: {name}",
                            "src": os.path.join(item_path, file),
                            "type": "singleton"
                        })
            else:
                # For standard collections (blog, pages)
                pages_structure.append({
                    "name": item.capitalize(),
                    "src": item_path,
                    "type": "collection"
                })

    # Save the structure to .pages.yaml
    with open(output_file, "w") as f:
        yaml.dump(pages_structure, f, default_flow_style=False, sort_keys=False)

    print(f".pages.yaml has been generated with {len(pages_structure)} top-level categories.")

if __name__ == "__main__":
    generate_structure()
