export class DelayedCondition {
    private lastDelayStart = 0;
    private delayedMilis = 0;

    public isTrue(inMS: number = 0): boolean {
        return this.lastDelayStart + this.delayedMilis - inMS < Date.now();
    }

    public msPassed(): number {
        return Date.now() - this.lastDelayStart;
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
