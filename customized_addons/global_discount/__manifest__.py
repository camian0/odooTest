# -*- coding: utf-8 -*-
{
    "name": "Global Discount",
    "summary": "Module for aplication positive global discounts to products",
    "description": """
        Module to apply a global discount for each product on list for sale, and send it for dian a positive
        value for correctly billing
    """,
    "author": "Codyd",
    "website": "https://www.codyd.co",
    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    "category": "Uncategorized",
    "version": "0.1",
    "license": "LGPL-3",
    # any module necessary for this one to work correctly
    "depends": ["base", "point_of_sale"],
    # always loaded
    "data": [
        # 'security/ir.model.access.csv',
        "views/views.xml",
        "views/templates.xml",
    ],
    "application": True,
    "installable": True,
    "assets": {
        "point_of_sale._assets_pos": [
            "global_discount/static/src/js/*.js",  # Un asterisco
        ],
    },
}  # type: ignore
