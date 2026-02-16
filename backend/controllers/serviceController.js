const Service = require('../models/serviceModel');

exports.services = async (req, res) => {
    try {
         res.status(200).json([
            {name : "menicure",
            description : "best menicure ever",
            price : 2000
            },
            {name : "pedicure",
            description : "best pedicure ever",
            price : 3000
            },
            {name : "facial",
            description : "best facial ever",
            price : 5000
            },
            {
                name: "haircut",
                description : "best haircut",
                price : 4000
            },
         ])
    }
    catch {
        res.status(500).json({message : "not found"});

    }
}