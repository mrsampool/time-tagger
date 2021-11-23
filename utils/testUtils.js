module.exports = {
  expectPropsAndTypes(object, propsAndTypesArray) {
    propsAndTypesArray.forEach((property) => {
      const propName = property[0];
      const propType = property[1];
      expect(object).toHaveProperty(propName);
      expect(typeof object[propName]).toBe(propType);
    });
  },
};
