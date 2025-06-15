import {VStack} from "@chakra-ui/react";
import AddTripModal from "@/components/addTripModal/AddTripModal.tsx";
import {useGetTripsQuery} from "@/api/tripsApi.ts";
import Spinner from "@/components/ui/spinner/Spinner.tsx";
import Trip from "@/components/trip/Trip.tsx";

const TripsList = () => {
    const {data: trips, isLoading} = useGetTripsQuery();

    const processTrips = () => {
        if (trips && trips.length > 0) {
            return trips.map((trip) => (
                <Trip name={trip.name} key={trip._id!} startDate={new Date(trip.startDate).toLocaleDateString()}
                      endDate={new Date(trip.endDate).toLocaleDateString()} budget={trip.budget}
                      status={trip.status} id={trip._id!}/>))
        } else {
            return <p>У вас пока что нет путешествий</p>;
        }
    }

    return <VStack gap={'0.75rem'}>
        {isLoading ? <Spinner/> : processTrips()}
        <AddTripModal/>
    </VStack>

}

export default TripsList;