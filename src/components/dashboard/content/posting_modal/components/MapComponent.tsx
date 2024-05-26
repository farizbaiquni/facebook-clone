import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Fragment, useEffect } from "react";
import { LocationType } from "@/types/locations";
import L from "leaflet";
import { XMarkIcon } from "@heroicons/react/24/solid";

type MapType = {
  selectedLocation: LocationType;
  setSelectedLocation: (param: LocationType | null) => void;
};

export default function MapComponent({
  selectedLocation,
  setSelectedLocation,
}: MapType) {
  const { lat, lon, display_name }: LocationType = selectedLocation;

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <div className="relative flex h-[207px] w-full flex-col items-end">
      {selectedLocation && (
        <Fragment>
          <XMarkIcon
            onClick={() => setSelectedLocation(null)}
            className="mb-1 h-8 w-8 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-500 hover:bg-gray-300"
          />
          <MapContainer
            center={[parseFloat(lat), parseFloat(lon)]}
            zoom={8}
            className="min-h-[170px] w-full rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[parseFloat(lat), parseFloat(lon)]}>
              <Popup>{display_name}</Popup>
            </Marker>
          </MapContainer>
        </Fragment>
      )}
    </div>
  );
}
