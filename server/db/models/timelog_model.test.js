const timelogModel = require("./timelog_model");
const { expectPropsAndTypes } = require("../../../utils/testUtils");

describe("Timelog model", () => {
  describe("queryAllByUser", () => {
    let results;
    beforeAll(async () => {
      results = await timelogModel.queryAllByUser(1);
    });

    it("should return an array", () => {
      expect(Array.isArray(results)).toBe(true);
    });

    it("should only return entries from the specified user", () => {
      expect(
        results.every((result) => {
          return result.user_id === 1;
        })
      ).toBe(true);
    });

    describe("timelog entries", () => {
      it("should be an object with the correct properties", () => {
        expectPropsAndTypes(results[0], [
          ["id", "number"],
          ["user_id", "number"],
          ["in_time", "object"],
          ["out_time", "object"],
          ["total_time", "object"],
          ["rate", "number"],
          ["value", "number"],
          ["tags", "object"],
        ]);
      });
    });
  });

  describe("clockIn", () => {
    let firstResults, insertId, newResults;
    beforeAll(async () => {
      firstResults = await timelogModel.queryAllByUser(1);
      insertId = await timelogModel.clockIn(1);
      newResults = await timelogModel.queryAllByUser(1);
    });

    afterAll(() => {});

    it("should create a new entry in the timelog table", () => {
      expect(newResults.length).toBe(firstResults.length + 1);
    });

    it("should return an insert id", () => {
      expect(insertId).toBe(newResults[newResults.length - 1].id);
    });
  });

  describe("clockOut", () => {
    let insertId, clockedOut;

    beforeAll(async () => {
      insertId = await timelogModel.clockIn(1);
      clockedOut = await timelogModel.clockOut(1);
    });

    afterAll(async () => {
      await timelogModel.deleteById(insertId);
    });

    it("should return an object with the correct properties", () => {
      expectPropsAndTypes(clockedOut, [
        ["id", "number"],
        ["user_id", "number"],
        ["in_time", "object"],
        ["out_time", "object"],
        ["total_time", "object"],
        ["rate", "number"],
        ["value", "number"],
      ]);
    });
  });

  describe("deleteById", () => {
    let insertId, newResults;
    beforeAll(async () => {
      insertId = await timelogModel.clockIn(1);
      await timelogModel.deleteById(insertId);
      newResults = await timelogModel.queryAllByUser(1);
    });

    it("should remove an entry by id", () => {
      expect(
        newResults.find((logEntry) => {
          return logEntry.id === insertId;
        })
      ).not.toBeTruthy();
    });
  });
});
