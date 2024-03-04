import Invoice from '../administrator/invoiceModel.js';

const invoiceController = {
  async createInvoice(req, res) {
    try {
      const invoice = await Invoice.create(req.body);
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getAllInvoices(req, res) {
    try {
      const invoices = await Invoice.find();
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getInvoiceById(req, res) {
    try {
      const invoice = await Invoice.findById(req.params.id);
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateInvoice(req, res) {
    try {
      const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteInvoice(req, res) {
    try {
      const invoice = await Invoice.findByIdAndDelete(req.params.id);
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default invoiceController;
