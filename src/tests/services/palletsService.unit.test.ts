import { mocked } from 'ts-jest/utils';
import PalletsService from '../../services/pallets.service';
import Pallet from '../../models/Pallet.model';
import PalletCategory from '../../models/PalletCategory.model';
import PalletAuthor from '../../models/PalletAuthor.model';
import PalletDependency from '../../models/PalletDependency.model';
import { EPalletCategories, ESupportedPallets } from '../../pallets/pallets.types';
import { Op } from 'sequelize';

jest.mock('../../models/Pallet.model')

describe("Pallets Service test", () => {
  const MockedPalletModel = mocked(Pallet, true);

  beforeEach(() => {
    MockedPalletModel.mockClear();
  })

  describe("Pallet list function", () => {
    PalletsService.list();

    test("Find all should have been called on Pallet model", () => {
      expect(MockedPalletModel.findAll).toBeCalled()
    })

    test("Query includes author, dependencies, dependant joins", () => {
      expect(MockedPalletModel.findAll).toHaveBeenCalledWith({
        include: [
          expect.anything(),
          { model: PalletAuthor },
          { model: PalletDependency, as: 'dependencies' },
          { model: PalletDependency, as: 'dependants' },
        ]
      })
    })

    MockedPalletModel.mockClear();
    PalletsService.list(EPalletCategories.GOVERNANCE);

    test("Query includes filter join", () => {
      expect(MockedPalletModel.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: PalletCategory,
            where: {
              category: EPalletCategories.GOVERNANCE
            }
          },
          expect.anything(),
          expect.anything(),
          expect.anything()
        ]
      })
    })
  })

  describe("Find specific pallet", () => {
    PalletsService.pallet(ESupportedPallets.PALLET_CONTRACT);

    test("Find one should have been called on Pallet model", () => {
      expect(MockedPalletModel.findOne).toBeCalled();
    })

    test("Search query is PALLET_CONTRACT", () => {
      expect(MockedPalletModel.findOne).toBeCalledWith({
        where: {
          name: ESupportedPallets.PALLET_CONTRACT
        },
        include: expect.anything()
      })
    })

    test("Query includes author, dependencies, dependant joins", () => {
      expect(MockedPalletModel.findOne).toBeCalledWith({
        where: expect.anything(),
        include: [
          { model: PalletCategory },
          { model: PalletAuthor },
          { model: PalletDependency, as: 'dependencies' },
          { model: PalletDependency, as: 'dependants' },
        ]
      })
    })
  })

  describe("Pallet downloads increase function", () => {
    PalletsService.incrementNumberOfDownloads(
      [ESupportedPallets.PALLET_CONTRACT, ESupportedPallets.PALLET_ASSETS],
      2
    )

    test("Increment is called", () => {
      expect(MockedPalletModel.increment).toBeCalled()
    })

    test("Pallets being incremented are only pallet contract and pallet_assets", () => {
      expect(MockedPalletModel.increment).toBeCalledWith(expect.anything(), {
        by: expect.anything(),
        where: {
          [Op.or]: [
            { name: ESupportedPallets.PALLET_CONTRACT },
            { name: ESupportedPallets.PALLET_ASSETS }
          ]
        }
      })
    })

    test("Number of downloads is increased by 2", () => {
      expect(MockedPalletModel.increment).toBeCalledWith(expect.anything(), {
        by: 2,
        where: expect.anything()
      })
    })
  })
})
