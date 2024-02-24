export default (data, type) => {
  if (type === 'remove') {
    const criteria = data.flatMap((obj) => obj.Criterions);
    const uniqueCriteria = [...new Set(criteria)];
    const handledCriteria = uniqueCriteria.map((criterion) =>
      criterion.replace(/_/g, ' ')
    );
    handledCriteria.sort((a, b) => a.localeCompare(b));
    const uppercaseCriteria = handledCriteria.map(
      (criterion) => criterion.charAt(0).toUpperCase() + criterion.slice(1)
    );
    return uppercaseCriteria;
  } else {
    const convertedCriteria = data.map((criterion) =>
      criterion.toLowerCase().replace(/\s/g, '_')
    );
    return convertedCriteria;
  }
};
