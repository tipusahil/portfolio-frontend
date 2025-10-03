"use client";
import Globe from "@/components/ui/globe";

export default function GlobeCities() {
  return (
  <div className="flex justify-center items-center -z-10">
      <div className="w-[400px] h-[400px] md:w-[800px]  md:h-[800px]  lg:w-[900px]  lg:h-[900px] overflow-hidden flex flex-col  items-center justify-center content-center ">
      <Globe
        // city to city rotate korle:
        //   rotateCities={["new york", "london", "tokyo", "dubai", "paris"]}
        //   rotationSpeed={2000}

        //!important note for globe: (rotateCities) use korle infinty loop e ghurte parena, city to city ta off korte hbe
        autoRotate={true} // ইনফিনিট স্মুথ রোটেশন // eta takbe, nahoi  rotateCities={["new york", "london", "tokyo", "dubai", "paris"]} eta takbe.
        rotationSpeed={0.02}
        markers={[
          { location: [40.7128, -74.006], size: 0.1 },
          { location: [51.5074, -0.1278], size: 0.1 },
          { location: [35.6762, 139.6503], size: 0.1 },
          { location: [25.2048, 55.2708], size: 0.1 },
          { location: [48.8566, 2.3522], size: 0.1 },
          { location: [23.685, 90.3563], size: 0.1 }, // Bangladesh
        ]}
        glowColor={[0.1, 0.8, 1]}
        markerColor={[0.1, 0.8, 1]}
        className="w-full h-full "
      />
    </div>
  </div>
  );
}
