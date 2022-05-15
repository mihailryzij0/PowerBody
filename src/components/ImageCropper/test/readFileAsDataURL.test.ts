import { FileReaderMock } from "../../../test-utils/fileReaderMock";
import readFileAsDataURL from "../readFileAsDataURL";

describe("readFileAsDataURL()", () => {
  const file = new File([new ArrayBuffer(1)], "file.jpg");
  const fileReader = new FileReaderMock();
  jest.spyOn(window, "FileReader").mockImplementation(() => fileReader);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve file as data URL", async () => {
    fileReader.result = "file content";
    fileReader.addEventListener.mockImplementation((_, fn) => fn());

    const content = await readFileAsDataURL(file);
    expect(content).toBe("file content");
    expect(fileReader.readAsDataURL).toHaveBeenCalledTimes(1);
    expect(fileReader.readAsDataURL).toHaveBeenCalledWith(file);
  });
});
