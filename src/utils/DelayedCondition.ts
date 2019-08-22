export class DelayedCondition {
    private lastDelayStart = 0;
    private delayedMilis = 0;

    public active(inMS: number = 0): boolean {
        return this.lastDelayStart + this.delayedMilis - inMS < Date.now();
    }

    public restart() {
        this.lastDelayStart = 0;
        this.delayedMilis = 0;
    }

    public delay(milis: number) {
        this.lastDelayStart = Date.now();
        this.delayedMilis = milis;
    }
}
