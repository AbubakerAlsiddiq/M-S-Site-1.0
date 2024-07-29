from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import pandas as pd
from urllib.parse import unquote
import os

app = Flask(__name__, static_folder='C:/Users/aahme/Documents/m-and-s-website/src/backend/static', static_url_path='/')
CORS(app)

file_path = 'C:/Users/aahme/Documents/m-and-s-website/src/assets/inventory.xlsx'

def create_category_items_dict(categories_df, items_df):
    category_items_dict = {}
    
    for _, row in categories_df.iterrows():
        category = row['Category']
        item = row['Item']
        
        category_items_dict.setdefault(category, {})[item] = items_df.loc[items_df['Name'] == item, 'Price'].values[0]
    
    return category_items_dict

try:
    categories_df = pd.read_excel(file_path, sheet_name='Categories')
    items_df = pd.read_excel(file_path, sheet_name='Items')
    
    categories_df = pd.melt(categories_df, id_vars=['Category Name'], var_name='Category', value_name='Item')
    categories_df = categories_df.dropna(subset=['Item'])
    
    category_items_dict = create_category_items_dict(categories_df, items_df)
except FileNotFoundError:
    category_items_dict = {"error": "Inventory file not found."}
except pd.errors.EmptyDataError:
    category_items_dict = {"error": "No data in inventory file."}
except Exception as e:
    category_items_dict = {"error": str(e)}

@app.route('/api/inventory')  
def inventory():
    return jsonify(category_items_dict)

@app.route('/api/inventory/<category>', methods=['GET'])
def get_category_inventory(category):
    category_name = unquote(category)

    category_items = category_items_dict.get(category, {})
    return jsonify(category_items)

@app.route('/api/search', methods=['GET'])
def search_inventory():
    try:
        query = request.args.get('query', '').lower()
        if not query:
            return jsonify([])

        results = []
        for category, items in category_items_dict.items():
            for item, price in items.items():
                if query in item.lower():
                    results.append({
                        "key": item,
                        "price": price,
                        "category": category
                    })

        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/about')
def serve_about_page():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/inventory')
def serve_inventory_page():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/reviews')
def serve_reviews_page():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path.startswith('api/'):
        return jsonify({"error": "API endpoint not found"}), 404
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
    