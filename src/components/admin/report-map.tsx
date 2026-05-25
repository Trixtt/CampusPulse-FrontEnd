"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import "leaflet.heat";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  posts: any[];
}

function HeatmapLayer({
  posts,
}: Props) {

  const map = useMap();

  const heatPoints = posts
    .filter(
      (post) =>
        post.latitude &&
        post.longitude
    )
    .map((post) => [
      post.latitude,
      post.longitude,
      1,
    ]);

  // @ts-ignore
  L.heatLayer(heatPoints, {
    radius: 25,
    blur: 20,
  }).addTo(map);

  return null;
}

export default function ReportMap({
  posts,
}: Props) {

  return (
    <MapContainer
      center={[-6.200000, 106.816666]}
      zoom={15}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "24px",
      }}
    >

      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <HeatmapLayer posts={posts} />

      {
        posts.map((post, index) => (

          post.latitude &&
          post.longitude && (

            <Marker
              key={index}
              position={[
                post.latitude,
                post.longitude,
              ]}
            >

              <Popup>

                <h1>
                  {post.category}
                </h1>

                <p>
                  {post.content}
                </p>

              </Popup>

            </Marker>

          )
        ))
      }

    </MapContainer>
  );
}