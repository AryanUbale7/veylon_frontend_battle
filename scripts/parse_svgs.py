import os
import re

svg_dir = "temp_svgs"
output_file = "components/Icons.tsx"

os.makedirs("components", exist_ok=True)

svg_files = [f for f in os.listdir(svg_dir) if f.endswith(".svg")]

icons_jsx = []

def camel_case(match):
    return match.group(1) + match.group(2).upper()

# Attributes to replace in SVGs for React compatibility
attr_replacements = {
    r'(stroke|fill|clip|stroke-width|stroke-linecap|stroke-linejoin|fill-rule|clip-rule)="([^"]*)"': None
}

def clean_svg_content(content):
    # Remove XML declaration and comments
    content = re.sub(r'<\?xml.*?\?>', '', content)
    content = re.sub(r'<!--.*?-->', '', content)
    
    # Extract only the svg content (inside <svg ...> ... </svg>)
    match = re.search(r'<svg(.*?)>(.*?)</svg>', content, re.DOTALL)
    if not match:
        return ""
    
    svg_attrs = match.group(1)
    svg_body = match.group(2)
    
    # Convert standard attributes in body
    svg_body = re.sub(r'stroke-width="', 'strokeWidth="', svg_body)
    svg_body = re.sub(r'stroke-linecap="', 'strokeLinecap="', svg_body)
    svg_body = re.sub(r'stroke-linejoin="', 'strokeLinejoin="', svg_body)
    svg_body = re.sub(r'fill-rule="', 'fillRule="', svg_body)
    svg_body = re.sub(r'clip-rule="', 'clipRule="', svg_body)
    
    # Replace solid black/colored values with currentColor for stroke and fill
    svg_body = re.sub(r'stroke="#000000"', 'stroke="currentColor"', svg_body)
    svg_body = re.sub(r'stroke="#000"', 'stroke="currentColor"', svg_body)
    svg_body = re.sub(r'fill="#000000"', 'fill="currentColor"', svg_body)
    svg_body = re.sub(r'fill="#000"', 'fill="currentColor"', svg_body)
    
    # Make sure we don't have hardcoded stroke/fill if they are black
    svg_body = re.sub(r'fill="#114C5A"', 'fill="currentColor"', svg_body) # handle any specific default color
    
    # Clean the attributes on the <svg> wrapper itself
    width = "24"
    height = "24"
    viewbox = "0 0 24 24"
    
    w_match = re.search(r'width="([^"]*)"', svg_attrs)
    h_match = re.search(r'height="([^"]*)"', svg_attrs)
    vb_match = re.search(r'viewBox="([^"]*)"', svg_attrs)
    
    if w_match: width = w_match.group(1)
    if h_match: height = h_match.group(1)
    if vb_match: viewbox = vb_match.group(1)
    
    return {
        "body": svg_body.strip(),
        "width": width,
        "height": height,
        "viewBox": viewbox
    }

icons_jsx.append("import React from 'react';\n")
icons_jsx.append("interface IconProps extends React.SVGProps<SVGSVGElement> {\n  size?: number;\n}\n")

for f in svg_files:
    name = f.replace(".svg", "")
    # convert kebab-case to PascalCase
    component_name = "".join(part.capitalize() for part in name.split("-"))
    # append Icon if it conflicts with HTML names (e.g. Link)
    if component_name in ["Link", "Search"]:
        component_name += "Icon"
        
    filepath = os.path.join(svg_dir, f)
    with open(filepath, "r", encoding="utf-8") as file:
        content = file.read()
        
    parsed = clean_svg_content(content)
    if not parsed:
        continue
        
    # We create a React functional component
    jsx = f"""
export const {component_name}: React.FC<IconProps> = ({{ size = 24, className, ...props }}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={{size}}
    height={{size}}
    viewBox="{parsed['viewBox']}"
    fill="none"
    className={{className}}
    {{...props}}
  >
    {parsed['body']}
  </svg>
);
"""
    icons_jsx.append(jsx)

with open(output_file, "w", encoding="utf-8") as out:
    out.write("\n".join(icons_jsx))

print(f"Generated {len(svg_files)} icons in {output_file}")
