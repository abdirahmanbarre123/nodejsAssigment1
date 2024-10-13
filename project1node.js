

function calculateTotalTarget(startDate, endDate, totalTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let daysExcludingFridays = [];
    let daysWorkedExcludingFridays = [];
    let monthlyTargets = [];
    let totalDays = 0;
    // Iterate through each day in the date range
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (d.getDay() !== 5) { // 5 represents Friday
        const month = d.getMonth();
        if (!daysExcludingFridays[month]) {
          daysExcludingFridays[month] = 0;
          daysWorkedExcludingFridays[month] = 0;
        }   
        daysExcludingFridays[month]++;
        daysWorkedExcludingFridays[month]++;
        totalDays++;
      }
    }
    // Calculate daily target
    const dailyTarget = totalTarget / totalDays;
    // Calculate monthly targets
    for (let i = 0; i < daysExcludingFridays.length; i++) {
      if (daysExcludingFridays[i]) {
        monthlyTargets[i] = +(daysExcludingFridays[i] * dailyTarget).toFixed(2);
      }
    }
    // Remove empty months
    daysExcludingFridays = daysExcludingFridays.filter(Boolean);
    daysWorkedExcludingFridays = daysWorkedExcludingFridays.filter(Boolean);
    monthlyTargets = monthlyTargets.filter(Boolean);
    return {
      daysExcludingFridays,
      daysWorkedExcludingFridays,
      monthlyTargets,
      totalTarget: Math.round(dailyTarget * totalDays)
    };
  }
  // Example usage:
  const result = calculateTotalTarget('2024-01-01', '2024-03-31', 435);
  console.log(result);