exports.getWeatherAdvice = (req, res) => {
    const { condition } = req.query; // Usually weather condition is passed as query param: ?condition=Rainy
    let advice = "Maintain regular agricultural practices.";
    
    if (condition?.toLowerCase().includes('rain')) {
        advice = "Ensure proper drainage in fields to prevent waterlogging. Postpone applying fertilizers and spraying pesticides.";
    } else if (condition?.toLowerCase().includes('sunny') || condition?.toLowerCase().includes('hot') || condition?.toLowerCase().includes('clear')) {
        advice = "Increase irrigation frequency. Mulch soil to retain moisture. Check for heat stress on young plants.";
    } else if (condition?.toLowerCase().includes('cloud') || condition?.toLowerCase().includes('overcast')) {
        advice = "Good time for transplanting seedlings. Monitor for fungal diseases as humidity is high.";
    }

    res.json({ success: true, advice });
};
