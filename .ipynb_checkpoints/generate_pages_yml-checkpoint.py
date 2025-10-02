import os
import yaml

# Directory to scan
cms_dir = “cms”
output_file = “.pages.yml”

# Initialize the structure for .pages.yml content
pages_structure = []

# Traverse the directory tree
for root, dirs, files in os.walk(cms_dir):
    # Skip the root directory itself
    if root == cms_dir:
        continue

    # Extract the subfolder name relative to cms/
    relative_path = os.path.relpath(root, cms_dir)

    # Add entry for the folder
    pages_structure.append({
        “name”: relative_path.capitalize(),  # Use folder name as title
        “src”: os.path.join(cms_dir, relative_path)
    })

# Save the structure to .pages.yml
with open(output_file, “w”) as f:
    yaml.dump(pages_structure, f, default_flow_style=False)

print(f”.pages.yml has been generated with {len(pages_structure)} entries.”)