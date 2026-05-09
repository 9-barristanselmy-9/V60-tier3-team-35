import { Link } from "react-router";
import { Button } from "@repo/ui/components/button";
import type { DashboardResponse } from "@repo/types";

type Plant = NonNullable<DashboardResponse["plants"]>[number];

export function TaskList({ plants }: {plants?: Plant[]}) {
    return (
        <>
             <div className="flex flex-col gap-4 w-full mt-6 px-4">
        <div className="flex flex-col md:flex-row items-stretch gap-4">
                {plants && plants.length > 0 ? (
                    plants.map((plant, index) => (
                        <div
                            key={plant.id}
                            className="flex-1 flex flex-col items-start p-6 gap-4 bg-divider rounded-xl"
                        >
                            {plant.image && (
                                <img
                                    src={plant.image}
                                    alt={plant.name}
                                    className="w-full h-32 object-cover rounded-lg mb-2"
                                />
                            )}
                            <h2 className="leading-none">{index + 1}</h2>
                            <p>Water {plant.name}</p>
                        </div>
                    ))
                ) : (
                    <div className="flex-1 p-6 bg-divider rounded-xl opacity-50">
                        <p>No plants added yet. Go to Growing to start!</p>
                    </div>
                )}
                 </div>
                <Button
                    className="rounded-full bg-accent2"
                    variant="secondary"
                    asChild
                >
                    <Link to="/settings">Add new</Link>
                </Button>
            
            </div>
        </>

    );

}