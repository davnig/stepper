import { Stepper } from './stepper/Stepper.tsx'

enum STEPS {
    FIRST,
    SECOND,
    THIRD,
}

export function App() {
    return (
        <Stepper steps={Object.keys(STEPS).length / 2} initialValue='hello world'>
            {({ value }) => <div>{value}</div>}
        </Stepper>
    )
}
