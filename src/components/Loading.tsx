import { GridLoader } from "react-spinners";

export const Loading = () => {
  return (
    // TODO: Add the loading animation here
    <section className="flex w-full flex-grow flex-col items-center justify-center gap-4">
      <GridLoader size={75} margin={10} color="#FF9B66" loading={true} />
    </section>
  );
};
