import Invoice from './bill.model.js';

export const getInvoicesByUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'IDUser is required' });
        }

        const invoices = await Invoice.find({ userId });

        if (!invoices || invoices.length === 0) {
            return res.status(404).json({ error: 'No invoices found for the specified user' });
        }

        res.status(200).json({ invoices });
    } catch (error) {
        console.error('Error fetching invoices by user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getInvoiceDetails = async (req, res) => {
    try {
        const { invoiceId } = req.params;

        const invoice = await Invoice.findById(invoiceId);

        res.status(200).json({
            invoice
        });
    } catch (error) {
        console.error('Error fetching invoice details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const generateInvoice = async (userId, products, total) => {
    try {
        const newInvoice = new Invoice({
            userId,
            products,
            total,
            date: new Date()
        });

        await newInvoice.save();

        return newInvoice;
    } catch (error) {
        console.error('Error generating invoice:', error);
        throw new Error('Failed to generate invoice');
    }
};