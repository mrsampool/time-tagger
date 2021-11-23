module.exports = {
  expectPropsAndTypes(object, propsAndTypesArray) {
    propsAndTypesArray.forEach((property) => {
      let propName = property[0];
      let propType = property[1];
      expect(object).toHaveProperty(propName);
      expect(typeof object[propName]).toBe(propType);
    });
  },
};
