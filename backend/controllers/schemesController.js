exports.getSchemes = (req, res) => {
    const schemes = [
        { id: 1, name: 'PM-KISAN', description: 'Provides income support of ₹6,000 per year to landholding farmer families.', benefits: 'Financial aid directly transferred to bank account.' },
        { id: 2, name: 'Kisan Credit Card (KCC)', description: 'Timely and adequate credit support to farmers from the banking system.', benefits: 'Flexible repayment, low interest loans.' },
        { id: 3, name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', description: 'Government sponsored crop insurance scheme.', benefits: 'Protection against crop failure due to natural calamities, pests or diseases.' },
        { id: 4, name: 'Paramparagat Krishi Vikas Yojana (PKVY)', description: 'Promotes organic farming through cluster approach.', benefits: 'Financial assistance for organic inputs and certification.' }
    ];
    res.json({ success: true, schemes });
};
