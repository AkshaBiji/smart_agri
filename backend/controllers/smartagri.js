exports.recommendCrop = (req, res) => {
    const { location, soilType, weather, season } = req.body;
    let recommended = [];

    if (soilType?.toLowerCase() === 'alluvial' || season?.toLowerCase() === 'kharif') {
        recommended = [
            { id: 1, name: 'Rice', type: 'Traditional', tip: 'Requires rich water supply. Monitor early for pests.' },
            { id: 2, name: 'Hybrid Maize', type: 'Hybrid', tip: 'Good yield in all climates. Use nitrogen-rich fertilizer.' }
        ];
    } else if (soilType?.toLowerCase() === 'black' || season?.toLowerCase() === 'rabi') {
        recommended = [
            { id: 3, name: 'Wheat', type: 'Traditional', tip: 'Cool climate necessary. Sow in rows for better aeration.' },
            { id: 4, name: 'Cotton (Bt)', type: 'Hybrid', tip: 'High resistance to pests. Needs deep soil.' }
        ];
    } else {
        recommended = [
            { id: 5, name: 'Millets', type: 'Traditional', tip: 'Drought resistant. Low maintenance.' },
            { id: 6, name: 'Hybrid Tomato', type: 'Hybrid', tip: 'Grows fast in moderate conditions. Requires stalking.' }
        ];
    }

    res.json({ success: true, recommended });
};
