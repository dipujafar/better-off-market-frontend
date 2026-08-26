import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { OfferFormValues } from "@/lib/validations/offer-form";
import type { RootState } from "@/redux/store";
import type { IPropertyResponse } from "@/types";

// Only the subset of property fields OfferPropertyCard actually needs to
// render the review screen — not the full IPropertyResponse.
type OfferPropertyData = Pick<
  IPropertyResponse,
  "photos" | "listingPrice" | "propertyType" | "specifications"
>;

interface OfferDraftState {
  values: OfferFormValues | null;
  propertyId: string | null;
  supportingDocuments: File[];
  propertyData: OfferPropertyData | null;
}

const initialState: OfferDraftState = {
  values: null,
  propertyId: null,
  supportingDocuments: [],
  propertyData: null,
};

const offerDraftSlice = createSlice({
  name: "offerDraft",
  initialState,
  reducers: {
    setOfferDraft: (
      state,
      action: PayloadAction<{
        values: OfferFormValues;
        propertyId: string;
        supportingDocuments: File[];
        propertyData?: OfferPropertyData;
      }>,
    ) => {
      state.values = action.payload.values;
      state.propertyId = action.payload.propertyId;
      state.supportingDocuments = action.payload.supportingDocuments;
      state.propertyData = action.payload.propertyData ?? null; // <- this line was missing
    },

    clearOfferDraft: (state) => {
      state.values = null;
      state.propertyId = null;
      state.supportingDocuments = [];
      state.propertyData = null;
    },
  },
});

// selectors
export const selectOfferDraft = (state: RootState) => state.offerDraft;

export const { setOfferDraft, clearOfferDraft } = offerDraftSlice.actions;

export default offerDraftSlice.reducer;