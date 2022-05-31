const companyModal= require ("../models/company.js");
const mongoose =require ("mongoose");

const companyCntrl ={
    createCompany : async (req, res) => {
        const Company = req.body;
        const newCompany = new companyModal({
        ...Company,
        creator: req.userId,
        createdAt: new Date().toISOString(),
  });

  try {
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
},

getCompanys : async (req, res) => {
  const { page } = req.query;
  try {
      // const Companys = await companyModal.find();
      // res.status(200).json(Companys);
      
      const limit = 6;
      const startIndex = (Number(page) - 1) * limit;
      const total = await companyModal.countDocuments({});
      const Companys = await companyModal.find().limit(limit).skip(startIndex);
    res.json({
        data: Companys,
        currentPage: Number(page),
        totalCompanys: total,
        numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
  }
},

getCompany : async (req, res) => {
  const { id } = req.params;
  try {
      const Company = await companyModal.findById(id);
    res.status(200).json(Company);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
}
},

getCompanysByUser : async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "User doesn't exist" });
  }
  const userCompanys = await companyModal.find({ creator: id });
  res.status(200).json(userCompanys);
},

 deleteCompany : async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No Company exist with id: ${id}` });
        }
    await companyModal.findByIdAndRemove(id);
    res.json({ message: "Company deleted successfully" });
} catch (error) {
    res.status(404).json({ message: "Something went wrong" });
}
},

updateCompany : async (req, res) => {
    const { id } = req.params;
    const { title, description, creator, imageFile, tags } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Company exist with id: ${id}` });
    }

    const updatedCompany = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await companyModal.findByIdAndUpdate(id, updatedCompany, { new: true });
    res.json(updatedCompany);
} catch (error) {
    res.status(404).json({ message: "Something went wrong" });
}
},

getCompanysBySearch : async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const companyName = new RegExp(searchQuery, "i");
        const Companys = await companyModal.find({ companyName });
        res.json(Companys);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
},
getCompanysBySearchDomaines : async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const domaines = new RegExp(searchQuery, "i");
        const Companys = await companyModal.find({ domaines });
        res.json(Companys);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
},
getCompanysBySearchPays : async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const pay = new RegExp(searchQuery, "i");
        const Companys = await companyModal.find({ pay });
        res.json(Companys);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
},

getCompanysByDomaine : async (req, res) => {
    const { domaine } = req.params;
    try {
        const Companys = await companyModal.find({ domaines: { $in: domaine } });
        res.json(Companys);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
  }
},
getCompanysByPay : async (req, res) => {
    const { pay } = req.params;
    try {
        const Companys = await companyModal.find({ pays: { $in: pay } });
        res.json(Companys);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
  }
},

getRelatedCompanys : async (req, res) => {
    const tags = req.body;
  try {
      const Companys = await companyModal.find({ tags: { $in: tags } });
      res.json(Companys);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
},

likeCompany : async (req, res) => {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.json({ message: "User is not authenticated" });
        }
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Company exist with id: ${id}` });
        }
        
        const Company = await companyModal.findById(id);
        
        const index = Company.likes.findIndex((id) => id === String(req.userId));
        
        if (index === -1) {
            Company.likes.push(req.userId);
        } else {
            Company.likes = Company.likes.filter((id) => id !== String(req.userId));
        }
        
    const updatedCompany = await companyModal.findByIdAndUpdate(id, Company, {
      new: true,
    });
    
    res.status(200).json(updatedCompany);
} catch (error) {
    res.status(404).json({ message: error.message });
}
}
};
module.exports = companyCntrl
