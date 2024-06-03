import { tw } from "@/tailwind";
import { Card } from "@/ui-shared/components/card";
import { PROMOTION_LOCATION } from "@prisma/client";
import { FC } from "react";

import { CreatePromotionFormSchema } from "../create-promotion/hooks";
import { SavedContentCard } from "../saved-content-card";
import { ListPromotionForm } from "./list-promotion-form";
import { SearchPromotionForm } from "./search-promotion-form";

export type LocationsFormProps = {
  className?: string;
  handleChangeClick: (type: PROMOTION_LOCATION) => void;
  handleListSubmit: (data: CreatePromotionFormSchema["locations"]["list"]) => void;
  handleSearchSubmit: (data: CreatePromotionFormSchema["locations"]["search"]) => void;
  locationValues?: CreatePromotionFormSchema["locations"];
  locationsSaveStatus: Record<PROMOTION_LOCATION, boolean>;
  promotionLocations: PROMOTION_LOCATION[];
};

export const LocationsForm: FC<LocationsFormProps> = ({
  className,
  handleChangeClick,
  handleListSubmit,
  handleSearchSubmit,
  locationValues,
  locationsSaveStatus,
  promotionLocations,
}) => {
  const promotionLocationForms = {
    [PROMOTION_LOCATION.LIST]: () => (
      <ListPromotionForm defaultValues={locationValues?.list} handleSubmit={handleListSubmit} />
    ),
    [PROMOTION_LOCATION.SEARCH]: () => (
      <SearchPromotionForm
        defaultValues={locationValues?.search}
        handleSubmit={handleSearchSubmit}
      />
    ),
  };

  return (
    <Card className={tw("mobile:w-full desktop:mt-12 w-4/12 px-6 py-4", className)}>
      <p className="text-headlineS mb-4 text-center">Type</p>
      {promotionLocations.length ? (
        promotionLocations.map(type => {
          return (
            <div className="mt-8" key={type}>
              {locationsSaveStatus?.[type] ? (
                <SavedContentCard
                  handleClick={() => handleChangeClick(type)}
                  message="Configs saved"
                />
              ) : (
                <>
                  <p className="mb-4">{type} configs</p>
                  <Card className="w-full px-6 py-4">{promotionLocationForms?.[type]?.()}</Card>
                </>
              )}
            </div>
          );
        })
      ) : (
        <p>Select type!</p>
      )}
    </Card>
  );
};
