// Implementation of the different tests usign Jest, Enzyme and Mocha.
// Advertise: See the configuration of Jest in package.json
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "@testing-library/jest-dom/extend-expect";
import '@testing-library/jest-dom';

configure({ adapter: new Adapter() });
