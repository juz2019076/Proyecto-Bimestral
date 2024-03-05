import Company from '../companies/company.model.js';

// Obtener todas las empresas
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva empresa
export const createCompany = async (req, res) => {
  const companyData = req.body;
  try {
    const newCompany = await Company.create(companyData);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener una empresa por su ID
export const getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una empresa existente
export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const updatedCompany = await Company.findByIdAndUpdate(id, newData, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.json(updatedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una empresa existente
export const deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.json({ message: 'Empresa eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
